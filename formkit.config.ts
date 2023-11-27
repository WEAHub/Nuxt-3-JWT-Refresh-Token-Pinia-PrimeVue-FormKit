// formkit.config.ts
import type { DefaultConfigOptions } from '@formkit/vue'
import { primeInputs } from '@sfxcode/formkit-primevue'
import { applicationIcons, genesisIcons } from '@formkit/icons';

const config: DefaultConfigOptions = {
  inputs: primeInputs,
  icons: {
    ...applicationIcons,
    ...genesisIcons
  }
}

export default config