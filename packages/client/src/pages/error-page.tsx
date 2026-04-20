export default function ErrorPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-6 text-center">
      <div className="space-y-3">
        <h1 className="text-2xl font-semibold">Something went wrong</h1>
        <p className="text-muted-foreground">
          The page could not be rendered. Try again or return to the previous
          screen.
        </p>
      </div>
    </div>
  );
}
