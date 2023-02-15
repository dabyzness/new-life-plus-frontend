interface User {
  id: number;
  username: string;
}

interface Profile {
  id: number;
  name: string;
  avatar: string | null;
  experience: number;
  health: number;
  health_experience: number;
  level: number;
  strength: number;
  strength_experience: number;
  intellect: number;
  intellect_experience: number;
  charisma: number;
  charisma_experience: number;
  gold: number;
  username: string;
}

interface CreateProfileFormData {
  name: string;
  avatar?: string | null;
}

type SKILL = "HEALTH" | "STRENGTH" | "INTELLECT" | "CHARISMA";

type FREQ = "DAILY" | "WEEKLY" | "MONTHLY";

type DAILY_FREQ = "MON" | "TUE" | "WED" | "THU" | "FRI" | "SAT" | "SUN";

type RANK = "D" | "C" | "B" | "A" | "S";

type RARITY = "COMMON" | "UNCOMMON" | "RARE" | "EPIC" | "LEGENDARY";
