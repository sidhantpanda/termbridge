import mongoose from 'mongoose';

const remoteHostsSchema = new mongoose.Schema({
  name: String,
  host: String,
  port: Number,
  username: String,
  password: String,
});

const RemoteHosts = mongoose.model('RemoteHosts', remoteHostsSchema);

export default RemoteHosts;
