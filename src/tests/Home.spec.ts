import { mount } from '@vue/test-utils'
import Home from '../views/Home.vue'

describe('HelloWorld', () => {
    it('should have home class', () => {
        const wrapper = mount(Home)

        expect(wrapper.classes('home')).toBe(true)
    })
})
