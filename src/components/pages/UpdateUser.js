import React from "react";

const UpdateUser = (props) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [user, setUser] = useState({
    apiID: "Client",
    SID: "1",
    entity: { ContactNo: "+919354842197", Email: "dheeraj@brightmedia.in" },
  });
  const onInputChange = (e) => {
    setUser({ ...user, [e.target.SID]: e.target.value });
    console.log(e.target.value);
  };

  const onSubmit = async function (e) {
    e.preventDefault();
    await axios.put(
      `https://bmsinfoglobal.com/phpApiV2/apis/bmsSalesApi/public/index.php/api/save`,
      user
    );
    navigate("/");
  };

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const result = await axios.get(
      `https://bmsinfoglobal.com/phpApiV2/apis/bmsSalesApi/public/index.php/api/GetDataV3?entityTypeName=Tax/${id}`
    );
    setUser(result.data.entity);
  };
  return (
    <div className="container">
      <h2 className="text-center mb-4">Edit a User</h2>
      <form className="container border shadow" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <label for="name">Name</label>
          <input
            type="string"
            className="form-control"
            id="name"
            placeholder="Enter your name"
            value={user.name}
            onChange={(e) => onInputChange(e)}
          />
        </div>
        <div className="form-group">
          <label for="email">Email</label>
          <input
            type="email"
            className="form-control"
            aria-describedby="emailHelp"
            id="email"
            placeholder="Enter your email"
            value={user.email}
            onChange={(e) => onInputChange(e)}
          />
        </div>
        <div className="form-group">
          <label for="phone">Phone</label>
          <input
            type="string"
            className="form-control"
            id="phone"
            placeholder="Enter your phone number"
            value={user.phone}
            onChange={(e) => onInputChange(e)}
          />
        </div>
        <div className="form-group">
          <label for="dob">Date Of Birth</label>
          <input
            type="string"
            className="form-control"
            id="dob"
            placeholder="Enter your DOB"
            value={user.dob}
            onChange={(e) => onInputChange(e)}
          />
        </div>
        <button type="submit" className="btn btn-warning mr-2">
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateUser;

//invoice form
{
  /* <table
          className="table table-bordered table-hover align-left"
          id="tab_logic_total"
        >
          <tbody>
            <tr>
              <th className="text-center">Sub Total</th>
              <td className="text-center">
                <input
                  type="number"
                  name="sub_total"
                  className="form-control"
                  id="sub_total"
                  onChange={onChangeCalculationData}
                  value={invoiceDetails.Quantity * invoiceDetails.UnitPrice}
                  readOnly
                />
              </td>
            </tr>
            <tr>
              <th className="text-center">Tax</th>
              <td className="text-center">
                <div className="input-group mb-2 mb-sm-0">
                  <input
                    type="number"
                    className="form-control"
                    id="tax"
                    onChange={onChangeCalculationData}
                  />
                  <div className="input-group-addon">%</div>
                </div>
              </td>
            </tr>
            <tr>
              <th className="text-center">Tax Amount</th>
              <td className="text-center">
                <input
                  type="number"
                  name="tax_amount"
                  id="tax_amount"
                  className="form-control"
                  onChange={onChangeCalculationData}
                  readOnly
                />
              </td>
            </tr>
            <tr>
              <th className="text-center">Grand Total</th>
              <td className="text-center">
                <input
                  type="number"
                  name="total_amount"
                  id="total_amount"
                  className="form-control"
                  onChange={onChangeCalculationData}
                  readOnly
                />
              </td>
            </tr>
          </tbody>
        </table> */
}
