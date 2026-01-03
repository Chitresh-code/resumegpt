import type { ContactCardData } from '@/types/structured-outputs';
import { Mail, Phone, MapPin, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ContactCardProps {
  data: ContactCardData;
}

export default function ContactCard({ data }: ContactCardProps) {
  return (
    <Card className="bg-white border-gray-200">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl text-gray-900">Contact Information</CardTitle>
          <span className="text-sm text-gray-700">@username</span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Mail className="w-5 h-5 text-gray-700" />
            <a
              href={`mailto:${data.email}`}
              className="flex-1 flex items-center justify-between hover:underline text-gray-900"
            >
              <span>{data.email}</span>
              <ExternalLink className="w-4 h-4 text-gray-700" />
            </a>
          </div>
          
          {data.phone && (
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-gray-700" />
              <span className="text-gray-900">{data.phone}</span>
            </div>
          )}
          
          <div className="flex items-center gap-3">
            <MapPin className="w-5 h-5 text-gray-700" />
            <span className="text-gray-900">{data.location}</span>
          </div>
        </div>
        
        {data.socialLinks && data.socialLinks.length > 0 && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex flex-wrap gap-2">
              {data.socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm hover:underline text-gray-900"
                >
                  {link.platform}
                </a>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

