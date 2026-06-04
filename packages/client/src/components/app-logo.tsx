import { appImgSources } from '@/constants/app-image-sources';
import { cn } from '@/lib/utils';
import { useTheme } from '@/providers/theme-provider';

const AppLogo = ({
  logoClassName,
  nameClassName,
  className,
}: {
  logoClassName?: string;
  nameClassName?: string;
  className?: string;
}) => {
  const { theme } = useTheme();
  const currentTheme = theme === 'dark' ? 'dark' : 'light';

  return (
    <div className={cn('flex items-center gap-1', className)}>
      <img
        src={appImgSources[currentTheme].logo}
        alt="Logo"
        width={40}
        height={40}
        loading="eager"
        decoding="async"
        className={cn('size-10 object-contain', logoClassName)}
      />

      <img
        src={appImgSources[currentTheme].name}
        alt="App Name"
        width={56}
        height={20}
        loading="eager"
        decoding="async"
        className={cn('h-5 w-14 self-end mb-1 object-contain', nameClassName)}
      />
    </div>
  );
};

export default AppLogo;
