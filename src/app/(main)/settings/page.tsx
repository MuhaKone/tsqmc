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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useTheme } from 'next-themes';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import React, { useEffect, useState } from 'react';

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold">Paramètres</h1>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Profil</CardTitle>
              <CardDescription>
                Gérez les informations de votre profil.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="fullName">Nom complet</Label>
                <Input id="fullName" defaultValue="Mamady Condé" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Adresse e-mail</Label>
                <Input id="email" type="email" defaultValue="mamady.conde@example.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Rôle</Label>
                <Input id="role" defaultValue="Responsable Maintenance" readOnly />
              </div>
              <div className="space-y-2">
                <Label htmlFor="language">Langue</Label>
                <Select defaultValue="fr">
                  <SelectTrigger id="language">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fr">Français</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
              <Button>Enregistrer les modifications</Button>
            </CardFooter>
          </Card>

           <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>
                Choisissez comment vous souhaitez recevoir les alertes.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <Label className="text-base" htmlFor="email-notifications">
                    Notifications par e-mail
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Recevez les alertes critiques et les résumés par e-mail.
                  </p>
                </div>
                <Switch id="email-notifications" defaultChecked />
              </div>
              <div className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <Label className="text-base" htmlFor="push-notifications">
                    Notifications Push
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Recevez des alertes en temps réel sur vos appareils.
                  </p>
                </div>
                <Switch id="push-notifications" />
              </div>
            </CardContent>
             <CardFooter className="border-t px-6 py-4">
              <Button>Enregistrer les préférences</Button>
            </CardFooter>
          </Card>
        </div>

        <div className="lg:col-span-1">
           <Card>
            <CardHeader>
              <CardTitle>Apparence</CardTitle>
              <CardDescription>
                Personnalisez l'apparence de l'application.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div>
                    <Label className="text-base">Thème</Label>
                    <p className="text-sm text-muted-foreground">
                        Sélectionnez le thème pour votre tableau de bord.
                    </p>
                    {isMounted && (
                      <RadioGroup 
                          value={theme} 
                          onValueChange={setTheme}
                          className="grid max-w-md grid-cols-3 gap-4 pt-4"
                      >
                          <Label className="[&:has([data-state=checked])>div]:border-primary">
                              <RadioGroupItem value="light" className="sr-only" />
                              <div className="items-center rounded-md border-2 border-muted p-1 hover:border-accent">
                                  <div className="space-y-2 rounded-sm bg-[#ecedef] p-2">
                                  <div className="space-y-2 rounded-md bg-white p-2 shadow-sm">
                                      <div className="h-2 w-[80px] rounded-lg bg-[#ecedef]" />
                                      <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                                  </div>
                                  <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
                                      <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
                                      <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                                  </div>
                                  <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm">
                                      <div className="h-4 w-4 rounded-full bg-[#ecedef]" />
                                      <div className="h-2 w-[100px] rounded-lg bg-[#ecedef]" />
                                  </div>
                                  </div>
                              </div>
                              <span className="block w-full p-2 text-center font-normal">
                                  Clair
                              </span>
                          </Label>
                          <Label className="[&:has([data-state=checked])>div]:border-primary">
                              <RadioGroupItem value="dark" className="sr-only" />
                              <div className="items-center rounded-md border-2 border-muted bg-popover p-1 hover:border-accent">
                                  <div className="space-y-2 rounded-sm bg-slate-950 p-2">
                                  <div className="space-y-2 rounded-md bg-slate-800 p-2 shadow-sm">
                                      <div className="h-2 w-[80px] rounded-lg bg-slate-400" />
                                      <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                                  </div>
                                  <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
                                      <div className="h-4 w-4 rounded-full bg-slate-400" />
                                      <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                                  </div>
                                  <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
                                      <div className="h-4 w-4 rounded-full bg-slate-400" />
                                      <div className="h-2 w-[100px] rounded-lg bg-slate-400" />
                                  </div>
                                  </div>
                              </div>
                              <span className="block w-full p-2 text-center font-normal">
                                  Sombre
                              </span>
                          </Label>
                          <Label className="[&:has([data-state=checked])>div]:border-primary">
                              <RadioGroupItem value="system" className="sr-only" />
                              <div className="flex h-full items-center justify-center rounded-md border-2 border-muted p-1 hover:border-accent">
                                <p className="text-center text-sm text-muted-foreground">Système</p>
                              </div>
                              <span className="block w-full p-2 text-center font-normal">
                                  Système
                              </span>
                          </Label>
                      </RadioGroup>
                    )}
                </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
