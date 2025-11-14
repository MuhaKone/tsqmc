'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { addEquipment } from '@/lib/data';

export default function NewEquipmentPage() {
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newEquipment = {
      id: `eq-${Math.random().toString(36).substr(2, 9)}`,
      name: formData.get('name') as string,
      type: formData.get('type') as string,
      location: formData.get('location') as string,
      status: 'Healthy',
      imageUrl:
        (formData.get('imageUrl') as string) ||
        `https://picsum.photos/seed/${Math.random()}/600/400`,
      imageHint: (formData.get('type') as string).toLowerCase(),
      sensorData: {
        temperature: 25,
        vibration: 5,
        voltage: 230,
        current: 10,
      },
    };

    // In a real app, you'd call an action to save this to a database
    addEquipment(newEquipment);
    
    toast({
      title: 'Équipement ajouté',
      description: `${newEquipment.name} a été ajouté avec succès.`,
    });
    router.push(`/equipment/${newEquipment.id}`);
  };

  return (
    <div className="container mx-auto max-w-2xl">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h1 className="text-2xl font-semibold">Ajouter un nouvel équipement</h1>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Détails de l'équipement</CardTitle>
              <CardDescription>
                Remplissez les informations ci-dessous pour le nouvel équipement.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Nom de l'équipement</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Ex: Moteur principal Usine B"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Type d'équipement</Label>
                <Input
                  id="type"
                  name="type"
                  placeholder="Ex: Moteur électrique"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Emplacement</Label>
                <Input
                  id="location"
                  name="location"
                  placeholder="Ex: Usine Nord, Section A"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="imageUrl">URL de l'image (Optionnel)</Label>
                <Input
                  id="imageUrl"
                  name="imageUrl"
                  type="url"
                  placeholder="https://example.com/image.jpg"
                />
              </div>
            </CardContent>
          </Card>
          <div className="flex justify-end gap-2">
            <Button variant="outline" type="button" onClick={() => router.back()}>
              Annuler
            </Button>
            <Button type="submit">Ajouter l'équipement</Button>
          </div>
        </div>
      </form>
    </div>
  );
}
