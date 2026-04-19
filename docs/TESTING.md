# 🧪 Testing

[← Back to README](../README.md)

This project uses **Jest** with **React Testing Library** for unit and component tests.

---

## Running Tests

**Run all tests once:**

```bash
npm test
```

**Run in watch mode** (re-runs on file changes — great during development):

```bash
npm run test:watch
```

---

## Test Setup

| File | Purpose |
|---|---|
| `jest.config.js` | Jest configuration — sets environment to `jsdom`, maps path aliases, and uses `ts-jest` for TypeScript |
| `jest.setup.js` | Global setup — imports `@testing-library/jest-dom` to enable custom matchers like `toBeInTheDocument` |

---

## Writing Tests

Test files should be placed alongside the component they test, or in a `__tests__/` folder:

```
src/
  components/
    VenueCard.tsx
    VenueCard.test.tsx     ✅ co-located
  __tests__/
    HomePage.test.tsx      ✅ also fine
```

### Example Component Test

```tsx
import { render, screen } from '@testing-library/react'
import VenueCard from './VenueCard'

describe('VenueCard', () => {
  it('renders the venue name', () => {
    render(<VenueCard name="The Grand Hall" />)
    expect(screen.getByText('The Grand Hall')).toBeInTheDocument()
  })
})
```

### Example User Interaction Test

```tsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BookingButton from './BookingButton'

it('calls onBook when clicked', async () => {
  const onBook = jest.fn()
  render(<BookingButton onBook={onBook} />)
  await userEvent.click(screen.getByRole('button', { name: /book/i }))
  expect(onBook).toHaveBeenCalledTimes(1)
})
```

---

## Tips

- Use `screen.getByRole` over `getByTestId` where possible — it tests accessibility too.
- Mock API calls with `jest.mock` or `jest.spyOn(global, 'fetch')` to keep tests fast and isolated.
- For Redux-connected components, wrap with a `<Provider store={store}>` in the test render.
