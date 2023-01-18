
import { createMachine, assign, send } from "xstate";

interface ToggleContext {
    еда: number;
    какули: number;
  }
  
  const toggleMachine = 
/** @xstate-layout N4IgpgJg5mDOIC5SEEQQfCCEYQQDCCC4QTA6ZQfhBAOEECEQAYkMAEQVZQXhBBhEEG4QTZQGRABtABgF1FQADgHtYASwAuooQDt+IAB6IAtAEYAnCrwBmFQDYA7ABZ9anSpWGtADgA0IAJ6IVXfXkOHnugEzHzu3Ya6AL5BdmhYuHjoqIAsIFTIpIBMIAyArCAUDAmYLNx8SCDCYpIycooISvqu+lpqVly6KlpcVl5eJnaOCD4ArNr6VioVulqBVobNIWEYOPjRcQnJaeSAoiCogOIgaQAE2AyAEiCYpJy8cgUSUrJ5pUqGXHh9Wv5cLWpeXGpquu2I9ze6XVZqj3uVn0XC6PgmIHC0yisXiSVSFBW61IW2mBxyxxEp2KF0QXnMeFGgXuLSGLVBnwQOhu7mc70MXUBjy6EKhkW2e0WhFQHKymAxeRORXOoEuNUJ-WeXTUXWu+nUlOlbg8dR88r0AX0LNCkKm7N2mEWAsEWOFJWULzUeGcYw0tSsAS8akpqi4Nz+XV0Lgs1idWm1kwi+FwuC5POm2SOgtNZzkHS1eDUKvpjK8jS8tgUiFlrmGgVldVMJNZevw1FoZA23JSCTY5BiWWIVdQNfRUZNhVjuM6v1uXVluiTphcDsMLoMt2qLTGAUsdRCOukQggcDkbMwmM7ONFymuPWeVlqrwL8udDgtDTw0usWmsASs0rGJaDBBIpE32JFWbKA1czxe+jeNUwyZh06g3CObw6P4tK-M+0KzHCCzvtGW5fpc1jaA6WoWP0XBaF4QyUn4eAGPU8r3F0BGEVo8H6pyKEdp+5plP6f4ZkeMpygq56dF4eBuhURgPv83pqPodHBtMaQfma3bGFYpHAk8DIuEY7yUoRinmBYli-PhDJqJJeDlsglbVrWsldjuVL8Vwli3vUKgtIejwus5ugCaYViUU0zlJsEC5AA */
createMachine<ToggleContext>({
  context: { еда: 3, какули: 0 },
  initial: "спит",
  id: "собака",
  states: {
    спит: {
      on: {
        проснулась: {
          target: "бодрствует",
        },
      },
    },
    бодрствует: {
      on: {
        устала: {
          target: "спит",
        },
        "хочет кушать": {
          target: "кушает",
        },
        "хочет какать": {
          target: "какает",
        },
      },
    },
    кушает: {
      entry: assign({ еда: (ctx) => ctx.еда - 1 }),
      always: {
        cond: "нет еды",
        target: "просит поесть",
      },
      on: {
        покушала: {
          target: "бодрствует",
        },
      },
    },
    какает: {
      entry: assign({ какули: (ctx) => ctx.какули + 1 }),
      on: {
        покакала: {
          target: "бодрствует",
        },
      },
    },
    "просит поесть": {
      on: {
        "дали поесть": {
          target: "кушает",
          actions: "покормили",
          internal: true
        },
      },
    },
  },
}, 
{
  guards:{
    'нет еды': (context, event) => {
      return context.еда <= 0
    },
  },
  actions:{
    покормили:(context)=> {
      context.еда = 3
      send('дали поесть')
    }
  }
});

export default toggleMachine

