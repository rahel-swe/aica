import { Button } from '@/components/ui/button';
import { Field, FieldGroup } from '@/components/ui/field';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { m } from '@/paraglide/messages';
import { ArrowUpRight, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

const DeleteAccountSuccessPage = () => {
  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-12">
      <div className="flex flex-col w-full max-w-md gap-8">
        {/* Header */}
        <section className="space-y-5 text-center">
          <div className="mx-auto flex size-16 items-center justify-center rounded-full border bg-primary/10">
            <Check className="size-8 text-primary" />
          </div>

          <div className="space-y-2">
            <h1 className="font-heading text-3xl font-bold tracking-tight">
              {m.auth_delete_account_success_title()}
            </h1>

            <p className="mx-auto max-w-sm text-sm leading-6 text-muted-foreground">
              {m.auth_delete_account_success_description()}
            </p>
          </div>
        </section>

        {/* Feedback */}
        <section className="rounded-xl p-6 flex flex-col gap-4">
          <FieldGroup className="gap-4">
            <Field>
              <Label htmlFor="feedback">
                {m.auth_delete_account_feedback_label()}
              </Label>

              <Textarea
                id="feedback"
                rows={5}
                className="resize-none placeholder:text-sm min-h-26"
                placeholder={m.auth_delete_account_feedback_placeholder()}
              />
            </Field>

            <p className="text-xs leading-5 text-muted-foreground">
              {m.auth_delete_account_feedback_hint()}
            </p>

            <Button className="py-6.5 mx-auto px-10 w-min mt-2">
              {m.auth_delete_account_feedback_button()}
              <ArrowUpRight className="rtl:rotate-270" />
            </Button>
          </FieldGroup>

          <Link to="/auth/sign-in" className="mx-auto">
            <Button variant="outline" className="py-6.5 mx-auto px-10 w-min">
              {m.auth_sign_in_title()}
              <ArrowUpRight className="rtl:rotate-270" />
            </Button>
          </Link>
        </section>

        {/* Back to sign in */}
      </div>
    </main>
  );
};

export default DeleteAccountSuccessPage;
