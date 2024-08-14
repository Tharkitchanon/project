import * as tf from '@tensorflow/tfjs';
import { prepareData } from './dataPreprocessing';

// ฟังก์ชันสร้างและฝึกโมเดล
export async function trainModel() {
  const { xs, ys } = await prepareData();

  const model = tf.sequential();
  model.add(tf.layers.dense({
    units: 10,
    activation: 'relu',
    inputShape: [1],
  }));
  model.add(tf.layers.dense({
    units: 1,
    activation: 'linear',
  }));

  model.compile({
    optimizer: 'adam',
    loss: 'meanSquaredError',
  });

  await model.fit(xs, ys, {
    epochs: 50,
    callbacks: tf.callbacks.earlyStopping({ monitor: 'loss' }),
  });

  return model;
}
