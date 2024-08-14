// src/linearRegression.js
import * as tf from '@tensorflow/tfjs';

// Function to create and train a linear regression model
export async function trainModel(timestamps, values) {
  // Convert timestamps to numeric values
  const timeInMinutes = timestamps.map(ts => new Date(ts).getTime() / (1000 * 60));

  // Create tensor for features (time) and labels (values)
  const xs = tf.tensor2d(timeInMinutes, [timeInMinutes.length, 1]);
  const ys = tf.tensor2d(values, [values.length, 1]);

  // Define the model
  const model = tf.sequential();
  model.add(tf.layers.dense({ units: 1, inputShape: [1] }));
  model.compile({ optimizer: 'sgd', loss: 'meanSquaredError' });

  // Train the model
  await model.fit(xs, ys, {
    epochs: 100,
    callbacks: tf.callbacks.earlyStopping({ monitor: 'loss' })
  });

  return model;
}

// Function to predict new values using the trained model
export function predict(model, timestamps) {
  const timeInMinutes = timestamps.map(ts => new Date(ts).getTime() / (1000 * 60));
  const xs = tf.tensor2d(timeInMinutes, [timeInMinutes.length, 1]);
  const predictions = model.predict(xs);
  return predictions.dataSync();
}
