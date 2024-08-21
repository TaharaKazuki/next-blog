import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import { formatDate } from '@/app/blog/contents/utils';

type CardCategoryProps = {
  title: string;
  summary: string;
  date: string;
};

const CardCategory = ({ title, summary, date }: CardCategoryProps) => {
  return (
    <Card className="flex h-full flex-col justify-between shadow-lg">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardContent>
          <p>{summary}</p>
        </CardContent>
        <CardFooter>
          <p className="text-xs text-gray-500">{formatDate(date)}</p>
        </CardFooter>
      </CardHeader>
    </Card>
  );
};

export default CardCategory;
