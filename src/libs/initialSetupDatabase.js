const Role = require('../models/role.model');
const ConfApp = require('../models/confApp.model');

//* Initial configuration Roles in database

const createRoles = async () => {
  try {
    const count = await Role.estimatedDocumentCount();

    if (count > 0) return;

    const values = await Promise.all([
      new Role({
        name: 'user',
        app: 'ultraindustria',
        menu: [
          {
            "text": "Dashboard",
            "link": "main.dashboard",
            "submain": [],
            "actions": [
              "R",
              "W",
              "D"
            ]
          },
          {
            "text": "Producción",
            "link": "",
            "submain": [
              {
                "text": "Log Registros",
                "link": "main.log",
                "submain": [],
                "actions": [
                  "R",
                  "W",
                  "D"
                ]
              },
              {
                "text": "Configuración",
                "link": "",
                "submain": [
                  {
                    "text": "Materiales",
                    "link": "main.material",
                    "actions": [
                      "R",
                      "W",
                      "D"
                    ]
                  },
                  {
                    "text": "Receta",
                    "link": "main.recipe",
                    "actions": [
                      "R",
                      "W",
                      "D"
                    ]
                  }
                ]
              }
            ]
          },
          {
            "text": "Planeación",
            "link": "",
            "submain": [
              {
                "text": "Calendario",
                "link": "main.calendar",
                "submain": [],
                "actions": [
                  "R",
                  "W",
                  "D"
                ]
              }
            ]
          },
          {
            "text": "Seguridad",
            "link": "",
            "submain": [
              {
                "text": "Roles",
                "link": "main.role",
                "submain": [],
                "actions": [
                  "R",
                  "W",
                  "D"
                ]
              },
              {
                "text": "Usuarios",
                "link": "main.user",
                "submain": [],
                "actions": [
                  "R",
                  "W",
                  "D"
                ]
              }
            ]
          }
        ],
      }).save(),
      new Role({
        name: 'admin',
        app: 'ultraindustria',
        menu: [
          {
            "text": "Dashboard",
            "link": "main.dashboard",
            "submain": [],
            "actions": [
              "R",
              "W",
              "D"
            ]
          },
          {
            "text": "Producción",
            "link": "",
            "submain": [
              {
                "text": "Log Registros",
                "link": "main.log",
                "submain": [],
                "actions": [
                  "R",
                  "W",
                  "D"
                ]
              },
              {
                "text": "Configuración",
                "link": "",
                "submain": [
                  {
                    "text": "Materiales",
                    "link": "main.material",
                    "actions": [
                      "R",
                      "W",
                      "D"
                    ]
                  },
                  {
                    "text": "Receta",
                    "link": "main.recipe",
                    "actions": [
                      "R",
                      "W",
                      "D"
                    ]
                  }
                ]
              }
            ]
          },
          {
            "text": "Planeación",
            "link": "",
            "submain": [
              {
                "text": "Calendario",
                "link": "main.calendar",
                "submain": [],
                "actions": [
                  "R",
                  "W",
                  "D"
                ]
              }
            ]
          },
          {
            "text": "Seguridad",
            "link": "",
            "submain": [
              {
                "text": "Roles",
                "link": "main.role",
                "submain": [],
                "actions": [
                  "R",
                  "W",
                  "D"
                ]
              },
              {
                "text": "Usuarios",
                "link": "main.user",
                "submain": [],
                "actions": [
                  "R",
                  "W",
                  "D"
                ]
              }
            ]
          }
        ],
      }).save(),
      new Role({
        name: 'operator',
        app: 'ultraindustria',
        menu: [
          {
            "text": "Dashboard",
            "link": "main.dashboard",
            "submain": [],
            "actions": [
              "R",
              "W",
              "D"
            ]
          },
          {
            "text": "Producción",
            "link": "",
            "submain": [
              {
                "text": "Log Registros",
                "link": "main.log",
                "submain": [],
                "actions": [
                  "R",
                  "W",
                  "D"
                ]
              },
              {
                "text": "Configuración",
                "link": "",
                "submain": [
                  {
                    "text": "Materiales",
                    "link": "main.material",
                    "actions": [
                      "R",
                      "W",
                      "D"
                    ]
                  },
                  {
                    "text": "Receta",
                    "link": "main.recipe",
                    "actions": [
                      "R",
                      "W",
                      "D"
                    ]
                  }
                ]
              }
            ]
          },
          {
            "text": "Planeación",
            "link": "",
            "submain": [
              {
                "text": "Calendario",
                "link": "main.calendar",
                "submain": [],
                "actions": [
                  "R",
                  "W",
                  "D"
                ]
              }
            ]
          },
          {
            "text": "Seguridad",
            "link": "",
            "submain": [
              {
                "text": "Roles",
                "link": "main.role",
                "submain": [],
                "actions": [
                  "R",
                  "W",
                  "D"
                ]
              },
              {
                "text": "Usuarios",
                "link": "main.user",
                "submain": [],
                "actions": [
                  "R",
                  "W",
                  "D"
                ]
              }
            ]
          }
        ],
      }).save(),
      new Role({
        name: 'planner',
        app: 'ultraindustria',
        menu: [
          {
            "text": "Dashboard",
            "link": "main.dashboard",
            "submain": [],
            "actions": [
              "R",
              "W",
              "D"
            ]
          },
          {
            "text": "Producción",
            "link": "",
            "submain": [
              {
                "text": "Log Registros",
                "link": "main.log",
                "submain": [],
                "actions": [
                  "R",
                  "W",
                  "D"
                ]
              },
              {
                "text": "Configuración",
                "link": "",
                "submain": [
                  {
                    "text": "Materiales",
                    "link": "main.material",
                    "actions": [
                      "R",
                      "W",
                      "D"
                    ]
                  },
                  {
                    "text": "Receta",
                    "link": "main.recipe",
                    "actions": [
                      "R",
                      "W",
                      "D"
                    ]
                  }
                ]
              }
            ]
          },
          {
            "text": "Planeación",
            "link": "",
            "submain": [
              {
                "text": "Calendario",
                "link": "main.calendar",
                "submain": [],
                "actions": [
                  "R",
                  "W",
                  "D"
                ]
              }
            ]
          },
          {
            "text": "Seguridad",
            "link": "",
            "submain": [
              {
                "text": "Roles",
                "link": "main.role",
                "submain": [],
                "actions": [
                  "R",
                  "W",
                  "D"
                ]
              },
              {
                "text": "Usuarios",
                "link": "main.user",
                "submain": [],
                "actions": [
                  "R",
                  "W",
                  "D"
                ]
              }
            ]
          }
        ],
      }).save()
    ]);

    console.log(values);
  } catch (error) {
    console.error(error);
  }

}

const createInitialConfApp = async () => {
  try {
    const count = await ConfApp.estimatedDocumentCount();

    if (count > 0) return;

    const initialConf = await new ConfApp({
      company: 'MIOBOX APP',
      nit: '123456789-0',
      initSerial: 1
    }).save()
    console.log(initialConf);

  } catch (error) {
    console.error(error);
  }

}



module.exports = { createRoles, createInitialConfApp };