import {shallowMount} from '@vue/test-utils'
import App from '../App.vue'

describe('App', () => {

    const app = shallowMount(App)
    test('test class exists', () => {
        // eslint-disable-next-line no-undef
        expect(app.classes()).toContain('test-class')
    })
})
