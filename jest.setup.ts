import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'text-encoding';

global.TextEncoder = TextEncoder as any;
global.TextDecoder = TextDecoder as any;
