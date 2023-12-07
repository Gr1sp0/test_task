const assert = require('assert')
const cfg = require("../../local_config.json")

const username = cfg.email;
const password = cfg.password;
const drivers = {
    0: {
        'name' : "Test_Owner2",
        'status': 'Active',
        'phone': '+1 (444) 444-4444',
        'contracts': '',
        'truck': 'Truck3',
        'email': 'test_owner2@gmail.com',
        'address': 'Miracle Manor, 85705, AZ',
        'documents': 'Citizen'
    },
    1: {
        'name' : "Test_Driver1",
        'status': 'Active',
        'phone': '+1 (666) 666-6666',
        'contracts': 'Test_Owner1',
        'truck': 'Truck1',
        'email': 'test_driver1@mail.ru',
        'address': 'Deerfield, 60015, IL',
        'documents': 'Not legal'
    },
    2: {
        'name' : "Test_Driver2",
        'status': 'Active',
        'phone': '+1 (875) 555-5555',
        'contracts': 'Test_Owner1',
        'truck': 'Truck2',
        'email': 'test_driver2@libero.it',
        'address': 'Manhattan, 10001, NY',
        'documents': 'Green card'
    },
    3: {
        'name' : "Test_Driver3",
        'status': 'Active',
        'phone': '+1 (234) 345-3453',
        'contracts': 'Test_Owner2',
        'truck': 'Truck5',
        'email': 'test_driver3@gmail.com',
        'address': 'Los Angeles, 90005, CA',
        'documents': 'Not legal'
    },
    4: {
        'name' : "Test_Driver4",
        'status': 'Active',
        'phone': '+1 (433) 333-3333',
        'contracts': 'Test_Owner2',
        'truck': 'Truck4',
        'email': 'test_driver4@gmail.com',
        'address': 'Hoisington, 67544, KS',
        'documents': 'Not legal'
    },
    5: {
        'name' : "Test_Driver5",
        'status': 'Active',
        'phone': '+1 (874) 444-4444',
        'contracts': 'Test_Owner2',
        'truck': 'Truck4',
        'email': 'test_driver5@gmail.com',
        'address': 'Ellsworth County, 67444, KS',
        'documents': 'Employment auth'
    },       
}
describe('Drivers page', () => {

  beforeEach( () => {
    cy.login(username, password)
    cy.visit('/users/drivers')
  })

it('Should check table', ()=> {
    let driversNumber
    cy.wait(1000)

    cy.contains('results found').invoke('text').then((text) => {
        const numberText = text.split(' ')[0];
        driversNumber = parseInt(numberText, 10);

        if (!isNaN(driversNumber)) {
         return
        } else {
            cy.log('driversNumber is not found');
          }
    }).then(() => {
        cy.get('tbody').find('tr').its('length').should('be.gte', 0).then((rowCount) => {
            assert.deepEqual(driversNumber, rowCount)
          });
      });


    cy.get('table thead tr th:eq(0)').should('exist').and('contain.text', 'Name')
    cy.get('table thead tr th:eq(1)').should('exist').and('contain.text', 'Status')
    cy.get('table thead tr th:eq(2)').should('exist').and('contain.text', 'Phone')
    cy.get('table thead tr th:eq(3)').should('exist').and('contain.text', 'Contacts')
    cy.get('table thead tr th:eq(4)').should('exist').and('contain.text', 'Truck')
    cy.get('table thead tr th:eq(5)').should('exist').and('contain.text', 'Email')
    cy.get('table thead tr th:eq(6)').should('exist').and('contain.text', 'Address')
    cy.get('table thead tr th:eq(7)').should('exist').and('contain.text', 'Documents')

    cy.get('tbody').find('tr').its('length').then((rowCount) => {
        for(let i = 0; i<= rowCount - 1; i++) {
            cy.get(`tbody tr:eq(${i})`).should('exist')
            cy.get(`tbody tr:eq(${i}) td:eq(0)`).should('contain.text', drivers[i].name)
            cy.get(`tbody tr:eq(${i}) td:eq(1)`).should('contain.text', drivers[i].status)
            cy.get(`tbody tr:eq(${i}) td:eq(2)`).should('contain.text', drivers[i].phone)
            cy.get(`tbody tr:eq(${i}) td:eq(3)`).should('contain.text', drivers[i].contracts)
            cy.get(`tbody tr:eq(${i}) td:eq(4)`).should('contain.text', drivers[i].truck)
            cy.get(`tbody tr:eq(${i}) td:eq(5)`).should('contain.text', drivers[i].email)
            cy.get(`tbody tr:eq(${i}) td:eq(6)`).should('contain.text', drivers[i].address)
            cy.get(`tbody tr:eq(${i}) td:eq(7)`).should('contain.text', drivers[i].documents)
        }
      });
})
})