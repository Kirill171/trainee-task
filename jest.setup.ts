import '@testing-library/jest-dom';

import { TextDecoder,TextEncoder } from 'text-encoding';

global.TextEncoder = TextEncoder as any;
global.TextDecoder = TextDecoder as any;
