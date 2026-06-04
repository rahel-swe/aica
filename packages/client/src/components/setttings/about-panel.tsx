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

const APP_VERSION = '0.1.0';

const AboutPanel = () => {
  return (
    <SettingsPanelShell
      icon={CircleHelp}
      title="About AICA"
      description="Learn more about the platform and legal information."
      header={
        <AppLogo
          className="mx-auto w-max md:ms-10"
          logoClassName="size-15"
          nameClassName="w-20 h-8"
        />
      }
    >
      <div className="rounded-4xl border bg-muted/40 p-4">
        <h3 className="font-semibold">AICA</h3>

        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
          An AI-assisted academic and career guidance platform designed to help
          students, graduates, and career changers discover educational pathways
          and make more confident decisions.
        </p>
      </div>

      <div className="rounded-4xl border bg-muted/40 overflow-hidden">
        <button
          type="button"
          className="flex w-full items-center justify-between p-4 text-left hover:bg-muted/70 cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <Code2 className="size-5" />
            <span>Source Code</span>
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
            <span>Apache 2.0 License</span>
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
            <span>Terms of Service</span>
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
            <span>Privacy Policy</span>
          </div>

          <ExternalLink className="size-4 text-muted-foreground" />
        </button>
      </div>

      <div className="rounded-4xl border bg-muted/40 p-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Version</span>

          <span className="font-medium">{APP_VERSION}</span>
        </div>
      </div>
    </SettingsPanelShell>
  );
};

export default AboutPanel;
