module.exports = {
  ping: async (req, res) => {
    // res.status(200).json({ msg: 'Build Amazing app!' });
    res.ok('cool', 'success', 200);
  },
};
