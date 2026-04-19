# ⚙️ Environment Variables

[← Back to README](../README.md)

Create a `.env.local` file in the project root. An example file is already provided:

```bash
cp example.env.local .env.local
```

---

## Reference

| Variable | Description | Example |
|---|---|---|
| `NEXTAUTH_URL` | The canonical URL of your app (required by NextAuth) | `http://localhost:3000` |
| `NEXTAUTH_SECRET` | Secret key used to sign NextAuth session tokens | `your-secret-key` |
| `NEXT_PUBLIC_BACKEND_URL` | Base URL of the Anumafia backend API | `http://localhost:5000` |

---

## Example `.env.local`

```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=replace_with_a_strong_random_secret
NEXT_PUBLIC_BACKEND_URL=http://localhost:5000
```

---

## Notes

- `NEXT_PUBLIC_*` variables are exposed to the browser. Do not put secrets in them.
- `NEXTAUTH_SECRET` should be a long random string. You can generate one with:
  ```bash
  openssl rand -base64 32
  ```
- For production deployments (e.g. Vercel), set these in **Project Settings → Environment Variables** in the Vercel dashboard.

> ⚠️ Never commit your `.env.local` file. It is already listed in `.gitignore`.
