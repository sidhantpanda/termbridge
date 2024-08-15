import mongoose from 'mongoose';

const remoteHostsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  host: { type: String, required: true },
  port: { type: Number, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
});

const RemoteHosts = mongoose.model('RemoteHosts', remoteHostsSchema);

export default RemoteHosts;
