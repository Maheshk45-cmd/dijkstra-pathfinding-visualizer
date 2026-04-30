export default function WeightModal({ fromLabel, toLabel, onConfirm, onCancel }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const val = parseFloat(e.target.weight.value);
    if (isNaN(val) || val <= 0) return;
    onConfirm(val);
  };

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <h3>Edge Weight</h3>
        <p>
          Connect <strong style={{ color: 'var(--blue)' }}>{fromLabel}</strong>
          {' → '}
          <strong style={{ color: 'var(--violet)' }}>{toLabel}</strong>
        </p>
        <form onSubmit={handleSubmit}>
          <input
            id="weight-input"
            name="weight"
            type="number"
            min="1"
            step="any"
            placeholder="Enter weight (e.g. 4)"
            className="modal-input"
            autoFocus
          />
          <div className="modal-actions">
            <button type="button" className="btn btn-secondary" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Add Edge
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
