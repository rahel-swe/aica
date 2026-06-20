import {
  CircleHelp,
  ExternalLink,
  FileText,
  Scale,
  ShieldCheck,
  Code2,
} from 'lucide-react';

import SettingsPanelShell from './settings-panel-shell';
import AppLogo from '../app-logo';
import { m } from '../../paraglide/messages';

const APP_VERSION = '0.1.0';

const AboutPanel = () => {
  return (
    <SettingsPanelShell
      icon={CircleHelp}
      title={m.about_title()}
      description={m.about_description()}
      header={
        <AppLogo
          className="mx-auto w-max md:ms-10"
          logoClassName="size-15"
          nameClassName="w-20 h-8"
        />
      }
    >
      <div className="rounded-4xl border bg-muted/40 p-4">
        <h3 className="font-semibold">{m.app_name()}</h3>

        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
          {m.about_app_description()}
        </p>
      </div>

      <div className="rounded-4xl border bg-muted/40 overflow-hidden">
        <button
          type="button"
          className="flex w-full items-center justify-between p-4 text-left hover:bg-muted/70 cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <Code2 className="size-5" />
            <span>{m.source_code()}</span>
          </div>

          <ExternalLink className="size-4 text-muted-foreground" />
        </button>

        <div className="border-t" />

        <button
          type="button"
          className="flex w-full items-center justify-between p-4 text-left hover:bg-muted/70 cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <Scale className="size-5" />
            <span>{m.license()}</span>
          </div>

          <ExternalLink className="size-4 text-muted-foreground" />
        </button>

        <div className="border-t" />

        <button
          type="button"
          className="flex w-full items-center justify-between p-4 text-left hover:bg-muted/70 cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <FileText className="size-5" />
            <span>{m.terms_of_service()}</span>
          </div>

          <ExternalLink className="size-4 text-muted-foreground" />
        </button>

        <div className="border-t" />

        <button
          type="button"
          className="flex w-full items-center justify-between p-4 text-left hover:bg-muted/70 cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <ShieldCheck className="size-5" />
            <span>{m.privacy_policy()}</span>
          </div>

          <ExternalLink className="size-4 text-muted-foreground" />
        </button>
      </div>

      <div className="rounded-4xl border bg-muted/40 p-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">{m.version()}</span>

          <span className="font-medium">{APP_VERSION}</span>
        </div>
      </div>
    </SettingsPanelShell>
  );
};

export default AboutPanel;
