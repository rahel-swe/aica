import { CardHeader, CardTitle, CardDescription } from '../ui/card';

type Props = {
  title: string;
  description: string;
};

const FormHeader = ({ title, description }: Props) => {
  return (
    <CardHeader className="text-center">
      <CardTitle className="text-xl">{title}</CardTitle>
      <CardDescription>{description}</CardDescription>
    </CardHeader>
  );
};

export default FormHeader;
