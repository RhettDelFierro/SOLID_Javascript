import {House2} from './explanation'

describe('runs the heat when the thermostat is low', () => {
  const thermostat = {read: async () => 65}
  const heater = {run: spy()}
  const cooler = {run: spy()}

  new House(thermostat, heater, cooler).changeThermostat(70)
  assert(heater.run.calledOnce())
  assert(cooler.run.notCalled())
})