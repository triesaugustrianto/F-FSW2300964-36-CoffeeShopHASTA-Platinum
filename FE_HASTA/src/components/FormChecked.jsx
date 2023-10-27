import React from "react";
import { useForm } from "react-hook-form";

export const FormChecked = ({
  Submits,
  name,
  product,
  totals,
  uang,
  kembalian,
  title = " Checked",
  check,
  isCheck,
}) => {
  const { handleSubmit } = useForm();
  return (
    <form onSubmit={handleSubmit(Submits)}>
      <div className="row mb-3">
        <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">
          Pemesan
        </label>
        <div className="col-sm-10">
          <input type="text" className="form-control" value={name} />
        </div>
      </div>
      <div className="row mb-3">
        <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">
          Product
        </label>
        <div className="col-sm-10">
          <div className="card px-2 py-2">{product}</div>
        </div>
      </div>

      <div className="row mb-3">
        <label htmlFor="inputtext3" className="col-sm-2 col-form-label">
          Totals
        </label>
        <div className="col-sm-10">
          <input type="text" className="form-control" value={totals} />
        </div>
      </div>
      <div className="row mb-3">
        <label htmlFor="inputtext3" className="col-sm-2 col-form-label">
          Money
        </label>
        <div className="col-sm-10">
          <input type="text" className="form-control" value={uang} />
        </div>
      </div>
      <div className="row mb-3">
        <label htmlFor="inputtext3" className="col-sm-2 col-form-label">
          Change money
        </label>
        <div className="col-sm-10">
          <input type="text" className="form-control" value={kembalian} />
        </div>
      </div>
      {isCheck && (
        <div className="row mb-3">
          <label htmlFor="inputtext3" className="col-sm-2 col-form-label">
            Cheked
          </label>
          <div className="col-sm-10">
            <input type="text" className="form-control" value={check} />
          </div>
        </div>
      )}
      <button type="submit" className="btn btn-success w-100 my-4">
        {title}
      </button>
    </form>
  );
};
