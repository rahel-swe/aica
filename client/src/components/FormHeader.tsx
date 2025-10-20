import { CardHeader, CardTitle, CardDescription } from './ui/card'

type Props = {
  title: string
  description: string
}

const FormHeader = ({ title, description }: Props) => {
  return (
    <CardHeader className='text-center'>
      <CardTitle className='text-2xl font-bold'>{title}</CardTitle>
      <CardDescription className='text-muted-foreground text-balance'>
        {description}
      </CardDescription>
    </CardHeader>
  )
}

export default FormHeader
