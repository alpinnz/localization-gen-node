export async function handleFileChange(runGenerate: () => Promise<void>): Promise<void> {
  await runGenerate();
}

