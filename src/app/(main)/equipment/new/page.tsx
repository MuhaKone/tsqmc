'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { addEquipment } from '@/lib/data';
import React from 'react';
import { Loader2, Wifi } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';

const availableSensors = [
  { id: 'temp-123', type: 'Temperature', status: 'Online' },
  { id: 'vib-456', type: 'Vibration', status: 'Online' },
  { id: 'volt-789', type: 'Voltage', status: 'Offline' },
  { id: 'curr-abc', type: 'Current', status: 'Online' },
];

export default function NewEquipmentPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isDetecting, setIsDetecting] = React.useState(false);
  const [detectedSensors, setDetectedSensors] = React.useState<typeof availableSensors>([]);
  const [selectedSensors, setSelectedSensors] = React.useState<string[]>([]);

  const handleDetectSensors = () => {
    setIsDetecting(true);
    // Simulate a network request
    setTimeout(() => {
      setDetectedSensors(availableSensors);
      setIsDetecting(false);
    }, 1500);
  };

  const handleSensorSelection = (sensorId: string) => {
    setSelectedSensors(prev => 
      prev.includes(sensorId) 
        ? prev.filter(id => id !== sensorId)
        : [...prev, sensorId]
    );
  };


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
          
          <Card>
            <CardHeader>
              <CardTitle>Capteurs IoT</CardTitle>
              <CardDescription>
                Détectez et associez des capteurs IoT à cet équipement.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {detectedSensors.length === 0 ? (
                <div className="flex flex-col items-center justify-center gap-4 rounded-lg border-2 border-dashed border-border p-8 text-center bg-muted/20">
                  <Wifi className="h-10 w-10 text-muted-foreground" />
                  <p className="text-muted-foreground">Aucun capteur détecté pour le moment.</p>
                  <Button type="button" onClick={handleDetectSensors} disabled={isDetecting}>
                    {isDetecting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Détection en cours...
                      </>
                    ) : (
                      'Détecter les capteurs'
                    )}
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">Sélectionnez les capteurs à associer :</p>
                  <div className="space-y-2 rounded-md border p-4">
                    {detectedSensors.map(sensor => (
                      <div key={sensor.id} className="flex items-center justify-between">
                         <div className="flex items-center space-x-3">
                          <Checkbox 
                            id={sensor.id} 
                            onCheckedChange={() => handleSensorSelection(sensor.id)}
                            checked={selectedSensors.includes(sensor.id)}
                          />
                          <Label htmlFor={sensor.id} className="font-normal">
                           <span className="font-medium">{sensor.type}</span> <span className="text-muted-foreground">(ID: {sensor.id})</span>
                          </Label>
                        </div>
                        <div className={`text-xs ${sensor.status === 'Online' ? 'text-green-500' : 'text-red-500'}`}>
                          {sensor.status}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
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
