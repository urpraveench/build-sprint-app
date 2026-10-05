declare const process: { env: Record<string, string | undefined> };
// A paid development trial must have an explicit end time, even if its flag stays on.
export function voiceTestingEnabled(now=Date.now()) {
 const until=Number(process.env.SARVAM_VOICE_TEST_UNTIL);
 return process.env.SARVAM_VOICE_TEST_ENABLED==="true" && Number.isFinite(until) && until>now;
}
