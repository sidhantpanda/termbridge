export const convertBlobToBase64 = async (blob: Blob) => {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result.split(',')[1]); // Split to remove the "data:audio/wav;base64," prefix
      }
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};

export const convertToWav = async (audioBuffer: AudioBuffer, sampleRate = 16000) => {
  const numberOfChannels = audioBuffer.numberOfChannels;
  const offlineContext = new OfflineAudioContext(numberOfChannels, audioBuffer.duration * sampleRate, sampleRate);

  // Create buffer source
  const bufferSource = offlineContext.createBufferSource();
  bufferSource.buffer = audioBuffer;

  // Connect the buffer source to the offline context
  bufferSource.connect(offlineContext.destination);
  bufferSource.start(0);

  const renderedBuffer = await offlineContext.startRendering();
  return renderedBuffer;
};

export const encodeWAV = (samples: Float32Array, sampleRate: number) => {
  const buffer = new ArrayBuffer(44 + samples.length * 2);
  const view = new DataView(buffer);

  const writeString = (view: DataView, offset: number, string: string) => {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i));
    }
  };

  const floatTo16BitPCM = (output: DataView, offset: number, input: Float32Array) => {
    for (let i = 0; i < input.length; i++, offset += 2) {
      const s = Math.max(-1, Math.min(1, input[i]));
      output.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
    }
  };

  writeString(view, 0, 'RIFF'); // RIFF identifier
  view.setUint32(4, 36 + samples.length * 2, true); // file length minus RIFF identifier length and file description length
  writeString(view, 8, 'WAVE'); // RIFF type
  writeString(view, 12, 'fmt '); // format chunk identifier
  view.setUint32(16, 16, true); // format chunk length
  view.setUint16(20, 1, true); // sample format (raw)
  view.setUint16(22, 1, true); // channel count
  view.setUint32(24, sampleRate, true); // sample rate
  view.setUint32(28, sampleRate * 2, true); // byte rate (sample rate * block align)
  view.setUint16(32, 2, true); // block align (channel count * bytes per sample)
  view.setUint16(34, 16, true); // bits per sample
  writeString(view, 36, 'data'); // data chunk identifier
  view.setUint32(40, samples.length * 2, true); // data chunk length

  floatTo16BitPCM(view, 44, samples);

  return buffer;
};

export const processAudio = async (audioBlob: Blob) => {
  const arrayBuffer = await audioBlob.arrayBuffer();
  const audioContext = new (window.AudioContext)();
  // const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
  const resampledBuffer = await convertToWav(audioBuffer, 16000);
  const samples = resampledBuffer.getChannelData(0);
  const wavBuffer = encodeWAV(samples, 16000);
  return new Blob([wavBuffer], { type: 'audio/wav' });
};

export function base64ToArrayBuffer(base64: string) {
  var binaryString = atob(base64);
  var len = binaryString.length;
  var bytes = new Uint8Array(len);
  for (var i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes.buffer;
}

// Function to strip the WAV header
export function stripWavHeader(arrayBuffer: ArrayBufferLike) {
  // WAV header is typically 44 bytes
  var headerSize = 44;
  return arrayBuffer.slice(headerSize);
}

// Function to convert an ArrayBuffer back to base64
export function arrayBufferToBase64(buffer: ArrayBuffer) {
  var binary = '';
  var bytes = new Uint8Array(buffer);
  var len = bytes.byteLength;
  for (var i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

export function base64ToBlob(base64: string) {
  var arrayBuffer = base64ToArrayBuffer(base64);
  var strippedArrayBuffer = stripWavHeader(arrayBuffer);
  var strippedBase64Wav = arrayBufferToBase64(strippedArrayBuffer);

  // Create a Blob from the base64 string
  var byteCharacters = atob(strippedBase64Wav);
  var byteNumbers = new Array(byteCharacters.length);
  for (var i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  var byteArray = new Uint8Array(byteNumbers);
  var blob = new Blob([byteArray], { type: 'audio/wav' });
  return URL.createObjectURL(blob);
}
