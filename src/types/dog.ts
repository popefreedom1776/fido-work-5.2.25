export interface Dog {
  id: string;
  ownerId: string;
  name: string;
  dateOfBirth: string;
  age: number;
  gender: 'male' | 'female';
  coatColor: string;
  spayedNeutered: boolean;
  biteHistory: 'NA' | 'Humans' | 'Dogs' | 'Both';
  biteHistoryInfo: string;
  foodAllergies: string;
  feedingInstructions: string;
  canHaveTreats: boolean;
  medication: string;
  pictureUrl?: string;
}

export interface DogOwner {
  id: string;
  name: string;
  dogs: Dog[];
  contactInfo: {
    phone: string;
    email: string;
    address: string;
  };
  walkingEquipment: {
    leash: string;
    harness: string;
    collar: string;
    other: string;
  };
} 