import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { Review } from './types';

interface ReviewsPageProps {
  reviews: Review[];
}

export default function ReviewsPage({ reviews }: ReviewsPageProps) {
  return (
    <div className="container py-12 max-w-4xl animate-fade-in">
      <h2 className="font-serif text-4xl mb-8">Отзывы клиентов</h2>
      <div className="space-y-6">
        {reviews.map((review) => (
          <Card key={review.id} className="border-0 shadow-md">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-semibold text-lg">{review.name}</h4>
                  <p className="text-sm text-muted-foreground">{review.date}</p>
                </div>
                <div className="flex gap-1">
                  {[...Array(review.rating)].map((_, i) => (
                    <Icon key={i} name="Star" size={16} className="fill-accent text-accent" />
                  ))}
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed">{review.text}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="mt-12 text-center">
        <Button variant="outline" size="lg">
          Оставить отзыв
        </Button>
      </div>
    </div>
  );
}
