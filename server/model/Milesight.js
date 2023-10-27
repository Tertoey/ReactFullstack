const mongoose = require('mongoose');

const am319 = new mongoose.Schema({
  dr: {
    bandwidth: Number,
    modulation: String,
    spreadFactor: Number,
  },
    adr: Boolean,
    freq: Number,
    snr: Number,
    rssi: Number,
    time: String,
    fcnt: Number,
    fport: Number,
    deveui: String,
    payload: {
      Timestamp: String,
      temperature: Number,
      humidity: Number,
      pir: String,
      light_level: Number,
      co2: Number,
      tvoc: Number,
      pressure: Number,
      pm2_5: Number,
      pm10: Number,
      o3: Number,
    },
    object: String,
    _msgid: String,
    buffer: { type: Buffer, contentType: String } // Binary data
});

const am319Data = mongoose.model('am319', am319);

module.exports = am319Data;