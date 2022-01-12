using System.Data;
using System.Threading.Tasks;
using MySqlConnector;

namespace WebLab3Api.Models
{
    public class Parameters
    {
        public int ID { get; set; }
        public int BiggerSide { get; set; }
        public int SmallerSide { get; set; }
        public int ShiftForBigger { get; set; }
        public int ShiftForSmaller { get; set; }

        internal AppDb Db { get; set; }
        
        internal Parameters(AppDb db)
        {
            Db = db;
        }


        public Parameters()
        {

        }
    }
}
