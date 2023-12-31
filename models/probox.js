const dbConnection = require("../config/dbConfig");

const insertHistory = async (uid, status, lock, timestamp) => {
  const sql = `INSERT INTO history(uid, status, lock, timestamp)
    VALUES (?, ?, ?, ?)`;
  const values = [uid, status, lock, timestamp];

  try {
    const [result] = await dbConnection.query(sql, values);
    return result;
  } catch (error) {
    throw error;
  }
};

const getAllHistory = async () => {
  const query =
    "SELECT * FROM history WHERE id < (SELECT MAX(id) FROM history) ORDER BY id DESC LIMIT 4";

  try {
    const [results] = await dbConnection.query(query);
    return results;
  } catch (error) {
    throw error;
  }
};

// const getRowCount = async () => {
//   const query = "SELECT COUNT(*) AS rowCount FROM history";

//   try {
//     const [results] = await dbConnection.query(query);
//     const rowCount = results[0].rowCount;
//     return rowCount;
//   } catch (error) {
//     throw error;
//   }
// };

// const deleteHistoryData = async (deleteCount) => {
//   const deleteQuery = `DELETE FROM history ORDER BY id ASC LIMIT ${deleteCount}`;

//   try {
//     const [result] = await dbConnection.query(deleteQuery);
//     return result.affectedRows; // Mengembalikan jumlah baris yang dihapus
//   } catch (error) {
//     throw error;
//   }
// };

module.exports = {
  insertHistory,
  getAllHistory,
  // getRowCount,
  // deleteHistoryData,
};

// const supabase = require("../config/supabaseConfig");

// const insertHistory = async (uid, status, lock, timestamp) => {
//   const { data, error } = await supabase
//     .from("history")
//     .insert([{ uid, status, lock, timestamp }]);

//   if (error) {
//     throw error;
//   }

//   return data;
// };

// const getAllHistory = async () => {
//   const { data, error } = await supabase
//     .from("history")
//     .select("*")
//     .order("id", { ascending: false })
//     .range(1, 4);

//   if (error) {
//     throw error;
//   }

//   return data;
// };

// // const getAllHistory = async () => {
// //   const { data, error } = await supabase
// //     .from("history")
// //     .select("*")
// //     .lt("id", supabase.from("history").select("id", { head: "max" }))
// //     .order("id", { ascending: false })
// //     .limit(4);

// //   if (error) {
// //     throw error;
// //   }

// //   return data;
// // };

// // const getRowCount = async () => {
// //   const { data, error } = await supabase
// //     .from("history")
// //     .select("*", { count: "exact" });

// //   if (error) {
// //     throw error;
// //   }

// //   const rowCount = data[0].count;
// //   return rowCount;
// // };

// // const deleteHistoryData = async (deleteCount) => {
// //   const { data, error } = await supabase
// //     .from("history")
// //     .delete()
// //     .order("id")
// //     .limit(deleteCount);

// //   if (error) {
// //     throw error;
// //   }

// //   const deletedRowsCount = data.length;
// //   return deletedRowsCount;
// // };

// module.exports = {
//   insertHistory,
//   getAllHistory,
//   // getRowCount,
//   // deleteHistoryData,
// };
