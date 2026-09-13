/**
 * Contact form endpoint. Rate limits by client IP, validates the payload
 * without any extra dependency, then hands the message to Resend's REST API
 * over `fetch` (no SDK). It fails loudly: the route never reports success
 * unless Resend actually accepted the email for delivery.
 */

import { NextRequest, NextResponse } from 'next/server';
import { siteConfig } from '@/lib/site-config';

const RATE_LIMIT_MAX_REQUESTS = 3;
const RATE_LIMIT_WINDOW_MS = 60_000;

const NAME_MIN_LENGTH = 2;
const NAME_MAX_LENGTH = 100;
const EMAIL_MAX_LENGTH = 254;
const MESSAGE_MIN_LENGTH = 10;
const MESSAGE_MAX_LENGTH = 5000;

/** Deliberately permissive — enough to catch typos, not an RFC 5322 parser. */
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Rate-limit buckets live in module memory, so the window is per server
 * instance and resets on every cold start. That is acceptable at this scale:
 * it stops casual form spam without pulling in a Redis/KV dependency.
 */
const rateLimitBuckets = new Map<string, { count: number; expiresAt: number }>();

function isRateLimited(clientId: string): boolean {
  const now = Date.now();

  // Prune expired buckets on every request so the Map cannot grow unbounded.
  for (const [id, bucket] of rateLimitBuckets) {
    if (bucket.expiresAt <= now) rateLimitBuckets.delete(id);
  }

  const bucket = rateLimitBuckets.get(clientId);

  if (!bucket) {
    rateLimitBuckets.set(clientId, { count: 1, expiresAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  if (bucket.count >= RATE_LIMIT_MAX_REQUESTS) return true;

  bucket.count += 1;
  return false;
}

interface ContactMessage {
  name: string;
  email: string;
  message: string;
}

type ValidationResult =
  | { ok: true; value: ContactMessage }
  | { ok: false; error: string };

function validate(body: unknown): ValidationResult {
  if (typeof body !== 'object' || body === null) {
    return { ok: false, error: 'Expected a JSON object with name, email and message.' };
  }

  const { name, email, message } = body as Record<string, unknown>;

  if (typeof name !== 'string') return { ok: false, error: 'Please enter your name.' };
  if (typeof email !== 'string') return { ok: false, error: 'Please enter your email address.' };
  if (typeof message !== 'string') return { ok: false, error: 'Please enter a message.' };

  const trimmedName = name.trim();
  const trimmedEmail = email.trim();
  const trimmedMessage = message.trim();

  if (trimmedName.length < NAME_MIN_LENGTH || trimmedName.length > NAME_MAX_LENGTH) {
    return {
      ok: false,
      error: `Name must be between ${NAME_MIN_LENGTH} and ${NAME_MAX_LENGTH} characters.`
    };
  }

  if (trimmedEmail.length > EMAIL_MAX_LENGTH || !EMAIL_PATTERN.test(trimmedEmail)) {
    return { ok: false, error: 'Please enter a valid email address.' };
  }

  if (trimmedMessage.length < MESSAGE_MIN_LENGTH || trimmedMessage.length > MESSAGE_MAX_LENGTH) {
    return {
      ok: false,
      error: `Message must be between ${MESSAGE_MIN_LENGTH} and ${MESSAGE_MAX_LENGTH} characters.`
    };
  }

  return {
    ok: true,
    value: { name: trimmedName, email: trimmedEmail, message: trimmedMessage }
  };
}

export async function POST(request: NextRequest) {
  // Rate limit before anything else, so a flood never reaches body parsing.
  const forwardedFor = request.headers.get('x-forwarded-for');
  const clientId = forwardedFor?.split(',')[0].trim() || 'unknown';

  if (isRateLimited(clientId)) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again in a minute.' },
      { status: 429, headers: { 'Retry-After': String(RATE_LIMIT_WINDOW_MS / 1000) } }
    );
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Request body must be valid JSON.' }, { status: 400 });
  }

  const result = validate(body);

  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;

  // No key means no email can be sent. Say so instead of faking a success.
  if (!apiKey) {
    return NextResponse.json(
      { error: 'Contact form is not configured yet.', fallbackEmail: siteConfig.email },
      { status: 503 }
    );
  }

  const { name, email, message } = result.value;

  // Subject is a single header line, so collapse any whitespace in the name.
  const subject = `Portfolio enquiry from ${name.replace(/\s+/g, ' ')}`;

  // Plain text only — submitted values are never interpolated into HTML.
  const text = [`Name: ${name}`, `Email: ${email}`, '', message].join('\n');

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM_EMAIL ?? 'Portfolio <onboarding@resend.dev>',
        to: [process.env.CONTACT_TO_EMAIL ?? siteConfig.email],
        reply_to: email,
        subject,
        text
      })
    });

    if (!response.ok) {
      // Log the provider's reason server-side; never surface it to the client.
      console.error('Resend rejected the message:', response.status, await response.text());
      return NextResponse.json(
        { error: 'Could not send your message right now.' },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact form failed unexpectedly:', error);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}
