module.exports = {
    "presets": [
        "@babel/preset-typescript",
        "@babel/preset-react",
        "@babel/preset-env"
    ],
    "plugins": [
        "@babel/plugin-syntax-dynamic-import",
        ["@babel/plugin-proposal-class-properties", { "loose": true }],
        "@babel/plugin-proposal-numeric-separator",
        "@babel/plugin-proposal-optional-chaining",
        ["@babel/plugin-proposal-pipeline-operator", { "proposal": "minimal" }]
    ],
    "env": {
        "production": {
            "presets": [
                [
                    "@babel/preset-env",
                    {
                        "targets": {
                            "ie": 11,
                        },
                        "useBuiltIns": "entry",
                        "forceAllTransforms": true
                    }
                ]
            ]
        },
        "development": {
            "presets": [
                [
                    "@babel/preset-env",
                    {
                        "targets": {
                            "ie": 11,
                        },
                        "useBuiltIns": "usage",
                        "forceAllTransforms": true
                    }
                ],
                [
                    "@babel/preset-react",
                    { "development": true }
                ]
            ]
        },
      "test": {
        "presets": [
          [
            "@babel/preset-env",
            {
              "targets": {
                "node": "current"
              }
            }
          ]
        ],
        "compact": false
      }
    }
}