# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.





<!-- Flight Delay Prediction System Using Machine Learning

I’m pleased to share my recent end-to-end Machine Learning project focused on predicting flight delays before departure using historical aviation and weather intelligence.

📌 Objective

To design a predictive system that estimates the probability of flight delays prior to scheduled departure time by combining operational flight data with weather conditions.

🔎 Data Sources

Historical On-Time Performance flight data

Scheduled departure & arrival times

Airline and route attributes

Distance & operational features

Weather parameters (temperature, wind speed, visibility, precipitation)

⚙️ Technical Approach

1️⃣ Data Engineering

Cleaned and structured large-scale aviation datasets

Engineered time-based and route-based features

Integrated weather data at airport-hour granularity

Applied categorical encoding and handled missing values

2️⃣ Model Development

Implemented a Random Forest classification model

Addressed class imbalance

Performed train-test validation

Evaluated using Accuracy, Precision, Recall, and F1-score

📊 Performance & Improvement Over Baseline

To ensure measurable impact, the model was compared against a baseline approach (predicting majority class / simple logistic model).

Improvements achieved:

✔ Improved prediction accuracy beyond naive baseline
✔ Increased recall for delayed flights (better detection of actual delays)
✔ Enhanced feature importance interpretability
✔ Reduced false negatives compared to baseline
✔ Better generalization on unseen test data

By incorporating weather intelligence and feature engineering, the system demonstrated stronger predictive capability than models trained only on basic scheduling data.

💡 Business Impact

This predictive framework can support:

Proactive flight operation planning

Improved passenger communication

Data-driven resource allocation

Early risk identification before departure

🧠 Key Learnings

Importance of feature engineering in operational ML systems

Handling imbalanced real-world datasets

Integrating multi-source data pipelines

Building scalable and reproducible ML workflows -->