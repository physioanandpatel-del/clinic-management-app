const { DataTypes } = require('sequelize');
const sequelize = require('../database/config');

const Appointment = sequelize.define('Appointment', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  patientId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  practitionerId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  serviceId: {
    type: DataTypes.UUID,
    allowNull: true
  },
  dateTime: {
    type: DataTypes.DATE,
    allowNull: false
  },
  duration: {
    type: DataTypes.INTEGER,
    defaultValue: 30,
    validate: { min: 15, max: 480 }
  },
  status: {
    type: DataTypes.ENUM('scheduled', 'completed', 'cancelled', 'no-show'),
    defaultValue: 'scheduled'
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  reminderSent: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  reminderType: {
    type: DataTypes.ENUM('email', 'sms', 'both', 'none'),
    defaultValue: 'email'
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'appointments',
  timestamps: true,
  indexes: [
    { fields: ['patientId'] },
    { fields: ['practitionerId'] },
    { fields: ['dateTime'] },
    { fields: ['status'] }
  ]
});

module.exports = Appointment;
