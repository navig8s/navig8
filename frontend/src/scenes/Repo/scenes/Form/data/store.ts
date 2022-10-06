import { defineStore } from 'pinia'
import { useScrollState } from '../../../utils/useScrollState'

export const useDataStore = defineStore('FormData', useScrollState)
