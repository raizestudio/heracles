import { expect, test, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { useRouter, usePathname } from 'next/navigation'
import { cookies } from 'next/headers'

import Page from '@/app/page'

// Mock next/navigation hooks
vi.mock('next/navigation', () => ({
  useRouter: vi.fn().mockReturnValue({
    route: '/',
    pathname: '/',
    query: {},
    asPath: '/',
  }),
  usePathname: vi.fn().mockReturnValue('/'), // Mock usePathname
}))

// Mock cookies to avoid request context errors
vi.mock('next/headers', () => ({
  cookies: vi.fn().mockReturnValue({
    get: vi.fn().mockReturnValue(undefined), // Return a mock value or undefined as needed
  }),
}))

test('Page root', () => {
  render(<Page />)
  expect(screen.getByRole('heading', { level: 1 })).toBeDefined()
})
