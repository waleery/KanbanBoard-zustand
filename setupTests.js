
import { expect, afterEach } from 'vitest';
import '@testing-library/jest-dom/vitest'

//matchers from jest-dom
import * as matchers from '@testing-library/jest-dom/matchers'

//cleaning enviroment after test to avoid e.g. leaks of memory
import { cleanup } from '@testing-library/react';


expect.extend(matchers)
afterEach(cleanup)


