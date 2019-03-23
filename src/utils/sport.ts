import { Injectable } from '@angular/core';

export interface Sport {
  type: string,
  code: string,
  FrequenceRefresh: number,
}

@Injectable() export class Sports
{
  sports: Array<Sport> = [
    {
      type: "Marche",
      code: "marche",
      FrequenceRefresh: 3000,
    },
    {
      type: "Course",
      code: "course",
      FrequenceRefresh: 1500,
    },
    {
      type: "Cyclisme",
      code: "cyclisme",
      FrequenceRefresh: 700,
    },
    {
      type: "Ski",
      code: "ski",
      FrequenceRefresh: 500,
    }
  ];

  constructor() { }

  public GetSports()
  {
    return this.sports;
  }
}
