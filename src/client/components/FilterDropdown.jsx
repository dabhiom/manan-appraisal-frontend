import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

function FilterDropdown({
  isOpen,
  onClose,
  departmentFilter,
  setDepartmentFilter,
  gradeFilter,
  setGradeFilter,
  pageSize,
  setPageSize,
  departments,
  grades,
  showInvalidFilter = false,
  invFilter,
  setInvFilter,
  setCurrentPage
}) {
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <motion.div
      ref={dropdownRef}
      className="filter-dropdown"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
    >
      <div className="filter-item">
        <label>Department</label>
        <select
          value={departmentFilter}
          onChange={(e) => setDepartmentFilter(e.target.value)}
        >
          <option value="">All Departments</option>
          {departments.map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </select>
      </div>
      <div className="filter-item">
        <label>Grade</label>
        <select
          value={gradeFilter}
          onChange={(e) => setGradeFilter(e.target.value)}
        >
          <option value="">All Grades</option>
          {grades.map((grade) => (
            <option key={grade} value={grade}>
              {grade}
            </option>
          ))}
        </select>
      </div>
      {showInvalidFilter && (
        <div className="filter-item">
          <label>Invalid Filter</label>
          <select
            value={invFilter}
            onChange={(e) => setInvFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="nulls">Null/Empty fields</option>
            <option value="range">Out of range (0–100)</option>
            <option value="nonnumeric">Non-numeric numeric fields</option>
            <option value="numericText">Numeric-only text fields</option>
          </select>
        </div>
      )}
      <div className="filter-item">
        <label>Rows per page</label>
        <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
            setCurrentPage(1);
          }}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="25">25</option>
          <option value="50">50</option>
        </select>
      </div>
    </motion.div>
  );
}

export default FilterDropdown;