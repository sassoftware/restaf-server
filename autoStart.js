import open from 'open';
async function autoStart(url) {
await open(url, {wait:true});
  console.error(`[Note]URL: ${url} closed by user`);
} 
export default autoStart;