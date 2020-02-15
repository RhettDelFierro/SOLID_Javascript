/*
* Improper cohesion, a ton of mocking, and taking a step back it seems like there isn't a distinction between the
* high level policy and low level implementation details. In order to detangle, use the Dependency Injection Principle.
*
*
* The unidrectional dependencies from high level usecases to low level details makes better sense in an analog world,
* where there is physical friction that prevents change.
*
* In code however, no such limits exist: we are asked to make quick changes to underlying dependency structures.
* */


/*
* The code as it stands would be difficult to change, if we want to swap out the gas heater for a geothermal heater,
* it would be a mess.
*
* As of right now, the code is breaking the Single Responsibility Principle:
* 1. The funciton defines high-level policy about HOW the thermostat, heater and cooler RELATE to one another.
* 2. It defines very low-level details about communicating with these particular devices
* SRP tells us that these disperate chunks of knowledge should be broken out into their own classes or functions.
*
* */

// what a depenency tree may look like for a house.
class House {
  async changeThermostat(newTemp) {
    // NEST thermostat to get the temperature
    const temp = await fetch('http://theromostat.local/read')
    // call either the heater or air conditioner:
    if (newTemp > temp) {
      fetch('http://gasheater.local/engage', {
        method: 'POST',
        body: JSON.stringify({run: true})
      })
    } else if (newTemp < temp) {
      fetch('http://electric-ac.local/engage', {
        method: 'POST',
        body: JSON.stringify({run: true})
      })
    }
  }
}

/*
* Iteration 1: addressing the SRP issues.
*
* We now have separate classes for each device which ENCAPSULATES the low-level logic around HOW that device is accessed.
* The changeThermostat() function now exclusively OWNS the high-level policy about HOW the objects RELATE to one another
* WITHOUT having to KNOW about their low-level details.
*
* We can stop here, however, there is a problem with this code if we take a look at it's dependencies:
*
*                                         class House
*
*           class NestThermostat          class GasHeater         class ElectricAC              //House depends on these
*
*
* The high-level objects on the top (House in this case) are dependent on the low-level IMPLEMENTATION DETAILS at the bottom.
* If we wanted to swap in that Geothermal heater, we WOULDN'T be able to because the House class DEPENDS on a gas heater.
*
* One (bad) solution would be to create a new CLASS to represent Geothermal houses, which would be a House, except with a Geothermal hvac system.
*
* */

class House1 {
  constructor() {
    this.thermostat = new NestThermostat()
    this.heater = new GasHeater()
    this.cooler = new ElectricAC()
  }

  async changeThermostat(newTemp) {
    const temp = await this.thermostat.read()
    if (newTemp > temp) {
      this.heater.run()
    } else if (newTemp < temp) {
      this.cooler.run()
    }
  }
}

class NestThermostat {
  read() {
    return fetch('http://theromostat.local/read')
  }
}

class GasHeater {
  run() {
    fetch('http://gasheater.local/engage', {
      method: 'POST',
      body: JSON.stringify({run: true})
    })
  }
}

class ElectricAC {
  run() {
    fetch('http://electric-ac.local/engage', {
      method: 'POST',
      body: JSON.stringify({run: true})
    })
  }
}

/*
* Bad Solution:
*
* We use classical inheritance to swap out the HVAC classes, assuming they conform to the same interface as the others.
* In isolation, this might seem like an acceptable solution.
* However, what if you wanted to swap out the NestThermostat for Honeywell or you use space heaters and windows?
*
* THE PERMUTATIONS MAKE THIS INFEASIBLE VERY QUICKLY.
*
* The Dependency Inversion Principle states that:
* High-level policies should NOT have dependencies on low-level implementation details.
* RATHER, those **details** SHOULD depend on the **policy**.
*
* What this means is that both sides should rely on an INTERFACE rather than an implementation.
* */
class GeothermalHouse extends House1 {
  constructor() {
    super()
    this.heater = new GeothermalHeater()
    this.coolr = new GeothermalCooler()
  }
}

class GeothermalHeater {
}

class GeothermalCooler {
}

/*
* Updated diagram:
*
*
*                                              class House
*                              ↙                    ↓                   ↘
* Thermostat interface                        Heater interface                      Cooler interface
*       ↑                                           ↑                                     ↑
* class NestThermostat                         class GasHeater                       class ElectricAC
*
* As we see, rather than depending directly on the NestThermostat, GasHeater and ElectricAC, the high-level policy depends on a Thermostat interface, a Heater interface and a Cooler interface.
* The implementation details CONFORM to those interfaces, and then can be plugged into the policy.
* The interfaces are ABSTRACTIONS while the implementation classes are CONCRETIONS. We want to favor ABSTRACTIONS over CONCRETIONS when writing high-level policies.
*
* The recent diagram shows us properly modularizing these CONCRETIONS in our code and now should be much easier to abstract them:
* Rather than being instantiated IN the House constructor (this.blah = new BLAH()), these instances should be passed in.
*
*
* Now, the high-level policy code knows NOTHING about the CONCRETIONS that might be passed in besides knowing that they will IMPLEMENT the defined interfaces.
*
* Like in the Interface Segregation Principle, using interfaces like this has beneficial side-effects such as:
* 1. Easy testing with few mocks (see the very first test). The mocks are very simple and only require a spy method to assert that the correct methods are being called.
* The mocks (thermostat, heater and cooler) in the test are test implementations of the thermostat, heater and cooler interfaces.
*   --We have created our own test CONCRETIONS, but our SUBJECT under test is blissfully unaware.
* We get clean, small unit tests that do not have to rely on meta-programming and reflection tricks.
*
* One big question remains: if our dependencies are being passed into the contructor, where in the system should they be INITIALIZED?
* This depends on WHERE the decisions are being made as to how Houses are being put together.
*   --It may be something that lives in the configuration layer, maybe it's data coming from the database, etc.
*   --Different classes might need different kinds of Houses and they would be responsible for the logic of HOW to put those together.
*   --You might even put this initiation logic into the main or index.js file.
*
* You'll know when you're doing it right if there's a clear distinction between your high-level policy classes and your low-level implementation classes.
* AND NEVER the two should meet.
*
* */

export class House2 {
  constructor(thermostat, heater, cooler) {
    this.thermostat = thermostat
    this.heater = heater
    this.cooler = cooler
  }

  async changeThermostat(newTemp) {
    const temp = await this.thermostat.read()
    if (newTemp > temp) {
      this.heater.run()
    } else if (newTemp < temp) {
      this.cooler.run()
    }
  }
}

new House2(new NestThermostat(), new GasHeater(), new ElectricAC())

/*
* Once again:
* If you create BOUNDARIES between your policy and the details,
* and the policy only depends on ABSTRACTIONS and not CONCRETIONS,
* then you'll be able to swap out your original implementation with new 3rd party services.
* */
