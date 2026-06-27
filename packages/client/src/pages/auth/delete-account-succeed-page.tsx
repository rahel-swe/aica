import { Button } from '@/components/ui/button';
import { Field, FieldGroup } from '@/components/ui/field';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ArrowUpRight, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { m } from '../../paraglide/messages';

const DeleteAccountSuccessPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="relative w-full max-w-lg flex flex-col gap-8">
        <div className="flex flex-col items-center text-center">
          <div className="mb-6 flex size-20 items-center justify-center rounded-full bg-primary/10">
            <Check className="size-10 text-primary" />
          </div>

          <h1 className="font-heading text-3xl font-bold tracking-tight">
            {m.auth_delete_account_success_title()}
          </h1>

          <p className="mt-4 max-w-md text-muted-foreground">
            {m.auth_delete_account_success_description()}
          </p>
        </div>

        <div className="rounded-lg border p-6">
          <FieldGroup>
            <Field>
              <Label htmlFor="feedback">
                {m.auth_delete_account_feedback_label()}
              </Label>

              <Textarea
                id="feedback"
                rows={5}
                placeholder={m.auth_delete_account_feedback_placeholder()}
              />
            </Field>

            <p className="text-xs text-muted-foreground">
              {m.auth_delete_account_feedback_hint()}
            </p>

            <Button className="w-full">
              {m.auth_delete_account_feedback_button()}
              <ArrowUpRight className="rtl:rotate-270" />
            </Button>
          </FieldGroup>
        </div>

        <Link to="/auth/sign-in" className="mx-auto">
          <Button variant="outline" className="py-6.5 px-10">
            {m.auth_sign_in_title()}
            <ArrowUpRight className="rtl:rotate-270" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default DeleteAccountSuccessPage;
