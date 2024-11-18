enum Rarity {
  Rare,
  Legendary
}
enum Effect {
  MightDamage,
  TroopRecovery,
  InitialRage,
  Rout,
  HeroMightIncrease,
  CityDefenseDamage,
  DoubleAttackState,
  HeroDamageIncrease
}
enum MilitarySpeciality {
  Warrior,
  Tactician,
  Marshal
}
enum Speciality {
  Swordsmen,
  Archer,
  Cavalry,
  Pikemen
}

type Skill = {
  name: string
  type?: string
  activationChance?: number
  rageCost?: number
  effects: Effect[]
  isCommanderSkill: boolean
  rarity: Rarity
}

type Hero = {
  name: string;
  militarySpeciality: MilitarySpeciality;
  specialities: Speciality[]
  commanderSkill: Skill,
  signatureSkill: Skill,
  heroSkill1: Skill,
  heroSkill2: Skill,
  skills: Skill[]
}

const skills: { [key: string]: Skill } = {
  steelRose: {
    name: 'Steel Rose',
    effects: [Effect.MightDamage, Effect.InitialRage],
    isCommanderSkill: false,
    rarity: Rarity.Legendary
  },
  warcry: {
    name: 'Warcry',
    type: 'Secondary Strike',
    activationChance: 0.25,
    effects: [Effect.MightDamage, Effect.TroopRecovery],
    isCommanderSkill: false,
    rarity: Rarity.Legendary
  },
  sunder: {
    name: 'Sunder',
    activationChance: 0.2,
    effects: [Effect.MightDamage, Effect.Rout],
    isCommanderSkill: false,
    rarity: Rarity.Rare
  },
  infuriation: {
    name: "Infuriation",
    activationChance: .2,
    isCommanderSkill: false,
    effects: [Effect.MightDamage, Effect.HeroMightIncrease],
    rarity: Rarity.Rare
  },
  siegeBreaker: {
    name: "Siege Breaker",
    activationChance: .2,
    isCommanderSkill: false,
    effects: [Effect.CityDefenseDamage],
    rarity: Rarity.Legendary
  },
  doubleAttack: {
    name: "Double Attack",
    activationChance: .08,
    isCommanderSkill: false,
    effects: [Effect.DoubleAttackState],
    rarity: Rarity.Legendary
  },
  protractedBattle: {
    name: "Protracted Battle",
    activationChance: .08,
    isCommanderSkill: false,
    effects: [Effect.DoubleAttackState],
    rarity: Rarity.Legendary
  },
  weakSpotAttack: {
    name: "Weak Spot Attack",
    activationChance: 0.2,
    effects: [Effect.MightDamage, Effect.HeroDamageIncrease],
    isCommanderSkill: false,
    rarity: Rarity.Legendary
  }
}

const heroes: { [key: string]: Hero } = {
  josephine: {
    name: 'Josephine',
    militarySpeciality: MilitarySpeciality.Warrior,
    specialities: [Speciality.Archer, Speciality.Swordsmen],
    commanderSkill: skills.steelRose,
    signatureSkill: skills.warcry,
    heroSkill1: skills.sunder,
    heroSkill2: skills.infuriation,
    skills: [skills.steelRose, skills.warcry, skills.sunder, skills.infuriation, skills.doubleAttack, skills.protractedBattle, skills.weakSpotAttack]
  }
}

